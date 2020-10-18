from dicttoxml import dicttoxml


def collect_data(request, engine):
    video_name = ''
    video_url = request['url']
    start_time = request['startedTime']
    end_time = request['endedTime']
    violence_type = request['violenceType']
    violence_mode = request['mediaType']
    visual = ''
    auditory = ''
    conversation = ''
    if violence_mode[0]['checked']:
        visual = 'yes'
    else:
        visual = 'no'

    if violence_mode[1]['checked']:
        auditory = 'yes'
    else:
        auditory = 'no'

    if violence_mode[2]['checked']:
        conversation = 'yes'
    else:
        conversation = 'no'



    try:

        sql_insert = "INSERT INTO frame_identification (" \
                     "video_name, video_url, start_time, end_time, violence_type, visual, auditory, conversation) " \
                     "values ('{}','{}','{}','{}','{}','{}', '{}', '{}')" \
            .format(video_name, video_url, start_time, end_time, violence_type, visual, auditory, conversation)

        print(sql_insert)

        result = engine.execute(sql_insert)
        return {"status": True, "msg": "Insert Success"}
    except Exception as e:
        return {"status": False, "msg": str(e)}
    
    
def generate_xml(engine):
    sql = "SELECT * FROM frame_identification"

    results = engine.execute(sql)
    results = [dict(row) for row in results]
    print(results)
    xml = dicttoxml(results, custom_root= 'videos', attr_type=False)
    xml = xml.decode("utf-8")
    print(type(xml))

    with open("output.xml", "w") as f:
        f.write(xml)

    return True
