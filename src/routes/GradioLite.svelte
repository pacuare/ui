<svelte:head>
    <script type="module" crossorigin src="https://cdn.jsdelivr.net/npm/@gradio/lite/dist/lite.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@gradio/lite/dist/lite.css" />
</svelte:head>

<gradio-lite playground class="flex-1 w-full">
    <gradio-requirements>
        requests
        pandas
    </gradio-requirements>
    <gradio-file name="pacuare.py">{`
# Pacuare SDK copyright (c) 2025 Aleks Rutins under the MIT license
import requests
import pandas as pd

class Client:
    """A client for the Pacuare API."""
    def __init__(self, base: str = 'https://api.pacuare.dev/v1'):
        """
        Create a new client.
        base is for development purposes.
        """
        self.base = base
    
    def query(self, sql: str, params: list = []) -> pd.DataFrame:
        """Query your database using SQL, returning a Pandas DataFrame of the results."""
        res = requests.post(self.base + '/query',
                            json={
                                'query': sql,
                                'params': params
                            })

        return pd.DataFrame.from_records(res.json()['values'], columns=res.json()['columns'])
    `}</gradio-file>
    {`
import gradio as gr
from pacuare import Client

db = Client()

def process(id):
    sql = "select injuries, turtle_occurrences from unique_turtles where turtle_id = $1"
    params = [id]
    if id == '':
        sql = "select injuries, turtle_occurrences from unique_turtles"
        params = []
    return (
        db.query(sql, params)
        .apply(
            lambda row: {
                **row, 
                'n_injuries': len(
                    [injury for injury in row['injuries'].split(',') if injury.strip() != '']
                )
            },
            axis=1,
            result_type='expand'
        )
    )

demo = gr.Interface(
    fn=process,
    inputs=["text"],
    outputs=[gr.ScatterPlot(x='turtle_occurrences', y='n_injuries')]
)

demo.launch()
    `}
</gradio-lite>