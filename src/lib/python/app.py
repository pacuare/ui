import gradio as gr
from pacuare import Client

db = Client()

async def process(id):
    sql = "SELECT count(turtle_id) AS turtle_occurrences, string_agg(injuries, ''::text) AS injuries FROM pacuare_raw WHERE turtle_id = %s GROUP BY turtle_id;"
    params = [id]
    if id == '':
        sql = "SELECT count(turtle_id) AS turtle_occurrences, string_agg(injuries, ''::text) AS injuries FROM pacuare_raw WHERE (turtle_id <> ''::text) GROUP BY turtle_id;"
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