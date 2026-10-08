from app.services.parser.repository import RepositoryParser
from app.services.graph.builder import GraphBuilder
from app.services.graph.database import GraphDatabaseService


class RepositoryIndexer:
    def __init__(self):
        self.parser = RepositoryParser()
        self.builder = GraphBuilder()
        self.database = GraphDatabaseService()

    def index(self, repository_path: str):
        results = self.parser.parse(repository_path)

        graph = self.builder.build(results)

        self.database.save_graph(graph)

        return {
            "files_parsed": len(results),
            "nodes": len(graph.nodes),
            "edges": len(graph.edges),
        }

    def close(self):
        self.database.close()
