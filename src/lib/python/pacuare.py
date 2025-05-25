from pyodide.http import pyfetch
import pandas as pd
import json

class Client:
    """A client for the Pacuare API."""
    def __init__(self, base: str = 'https://api.pacuare.dev/v1'):
        """
        Create a new client.
        base is for development purposes.
        """
        self.base = base
    
    async def query(self, sql: str, params: list = []) -> pd.DataFrame:
        """Query your database using SQL, returning a Pandas DataFrame of the results."""
        res = await pyfetch(self.base + '/query',
                            method='POST',
                            headers={
                                'Content-Type': 'application/json'
                            },
                            body=json.dumps({
                                'query': sql,
                                'params': params
                            }),
                            credentials='include')
        values = await res.json()
        return pd.DataFrame.from_records(values['values'], columns=values['columns'])
   