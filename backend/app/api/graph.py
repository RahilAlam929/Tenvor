from typing import Optional

from fastapi import APIRouter, Query

from app.services.graph.database import GraphDatabaseService

router = APIRouter(
    prefix="/graph",
    tags=["graph"],
)

database = GraphDatabaseService()


@router.get("/nodes")
def get_nodes(
    node_type: Optional[str] = Query(default=None),
):
    return {
        "nodes": database.get_nodes(node_type)
    }


@router.get("/relationships")
def get_relationships():
    return {
        "relationships": database.get_relationships()
    }


@router.get("/stats")
def get_stats():
    return database.get_stats()


@router.get("/functions/{function_name}/callers")
def get_function_callers(function_name: str):
    return {
        "function": function_name,
        "callers": database.get_callers(function_name),
    }


@router.get("/functions/{function_name}/callees")
def get_function_callees(function_name: str):
    return {
        "function": function_name,
        "callees": database.get_callees(function_name),
    }

@router.get("/functions/{function_name}/impact")
def get_function_impact(function_name: str):
    return {
        "function": function_name,
        "impact": database.get_impact(function_name),
    }

@router.get("/search")
def search_graph(q: str = Query(..., min_length=1)):
    return {
        "query": q,
        "results": database.search(q),
    }
