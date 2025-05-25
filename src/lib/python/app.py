import gradio as gr
from pacuare import Client

db = Client()

async def process(id):
    sql = "select injuries, turtle_occurrences from unique_turtles where turtle_id = %s"
    params = [id]
    if id == '':
        sql = "select injuries, turtle_occurrences from unique_turtles"
        params = []
    return (
        (await db.query(sql, params))
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