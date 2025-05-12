import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="wakewise",
        user="wakewise",
        password="no_password",
        host="localhost",
        port=5432
    )

def query(sql, params=None, fetch=True):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, params)
            if fetch and cur.description is not None:
                return cur.fetchall()
            return None