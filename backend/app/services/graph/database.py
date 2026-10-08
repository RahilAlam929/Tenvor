import os

from neo4j import GraphDatabase

from app.services.graph.models import CodeGraph


class GraphDatabaseService:
    def __init__(self):
        uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        username = os.getenv("NEO4J_USERNAME", "neo4j")
        password = os.getenv("NEO4J_PASSWORD", "tenvor123")

        self.driver = GraphDatabase.driver(
            uri,
            auth=(username, password),
        )

    def verify_connection(self):
        with self.driver.session() as session:
            result = session.run("RETURN 1 AS value")
            return result.single()["value"] == 1

    def save_graph(self, graph: CodeGraph):
        with self.driver.session() as session:
            for node in graph.nodes:
                session.run(
                    """
                    MERGE (n:CodeNode {id: $id})
                    SET
                        n.node_type = $node_type,
                        n.name = $name,
                        n.file_path = $file_path,
                        n.line = $line
                    """,
                    id=node.id,
                    node_type=node.node_type,
                    name=node.name,
                    file_path=node.file_path,
                    line=node.line,
                )

            for edge in graph.edges:
                session.run(
                    """
                    MATCH (source:CodeNode {id: $source})
                    MATCH (target:CodeNode {id: $target})
                    MERGE (source)-[r:RELATES {type: $relation}]->(target)
                    """,
                    source=edge.source,
                    target=edge.target,
                    relation=edge.relation,
                )

    def get_stats(self):
        with self.driver.session() as session:
            nodes = session.run(
                "MATCH (n:CodeNode) RETURN count(n) AS count"
            ).single()["count"]

            edges = session.run(
                "MATCH ()-[r:RELATES]->() RETURN count(r) AS count"
            ).single()["count"]

            return {
                "nodes": nodes,
                "edges": edges,
            }

    def close(self):
        self.driver.close()

    def get_nodes(self, node_type=None):
        with self.driver.session() as session:
            if node_type:
                result = session.run(
                    """
                    MATCH (n:CodeNode {node_type: $node_type})
                    RETURN n.id AS id,
                           n.node_type AS node_type,
                           n.name AS name,
                           n.file_path AS file_path,
                           n.line AS line
                    ORDER BY n.name
                    """,
                    node_type=node_type,
                )
            else:
                result = session.run(
                    """
                    MATCH (n:CodeNode)
                    RETURN n.id AS id,
                           n.node_type AS node_type,
                           n.name AS name,
                           n.file_path AS file_path,
                           n.line AS line
                    ORDER BY n.name
                    """
                )

            return [dict(record) for record in result]

    def get_relationships(self):
        with self.driver.session() as session:
            result = session.run(
                """
                MATCH (a:CodeNode)-[r:RELATES]->(b:CodeNode)
                RETURN
                    a.name AS source,
                    a.node_type AS source_type,
                    r.type AS relation,
                    b.name AS target,
                    b.node_type AS target_type
                ORDER BY a.name
                """
            )

            return [dict(record) for record in result]

    def get_callers(self, function_name: str):
        with self.driver.session() as session:
            result = session.run(
                """
                MATCH (caller:CodeNode)-[r:RELATES {type: "calls"}]->(target:CodeNode)
                WHERE target.name = $function_name
                RETURN
                    caller.name AS caller,
                    caller.file_path AS caller_file,
                    target.name AS target,
                    target.file_path AS target_file
                ORDER BY caller.name
                """,
                function_name=function_name,
            )

            return [dict(record) for record in result]

    def get_callees(self, function_name: str):
        with self.driver.session() as session:
            result = session.run(
                """
                MATCH (source:CodeNode)-[r:RELATES {type: "calls"}]->(callee:CodeNode)
                WHERE source.name = $function_name
                RETURN
                    source.name AS source,
                    source.file_path AS source_file,
                    callee.name AS callee,
                    callee.file_path AS callee_file
                ORDER BY callee.name
                """,
                function_name=function_name,
            )

            return [dict(record) for record in result]

    def get_impact(self, function_name: str):
        with self.driver.session() as session:
            result = session.run(
                """
                MATCH (source:CodeNode)-[r:RELATES {type: "calls"}]->(target:CodeNode)
                WHERE source.name = $function_name
                   OR target.name = $function_name
                RETURN
                    source.name AS source,
                    source.file_path AS source_file,
                    target.name AS target,
                    target.file_path AS target_file
                ORDER BY source.name, target.name
                """,
                function_name=function_name,
            )

            return [dict(record) for record in result]

    def search(self, search_term: str):
        with self.driver.session() as session:
            result = session.run(
                """
                MATCH (n:CodeNode)
                WHERE toLower(n.name) CONTAINS toLower($search_term)
                   OR toLower(n.file_path) CONTAINS toLower($search_term)
                RETURN
                    n.id AS id,
                    n.name AS name,
                    n.node_type AS node_type,
                    n.file_path AS file_path,
                    n.line AS line
                ORDER BY n.name
                LIMIT 50
                """,
                search_term=search_term,
            )

            return [dict(record) for record in result]
