def collect_data(request, engine):
    video_name = request.form.get('video_name')
    video_url = request.form.get('video_url')
    start_time = request.form.get('start_time')
    end_time = request.form.get('end_time')
    violence_type = request.form.get('violence_type')
    violence_mode = request.form.get('violence_mode')

    try:

        sql_insert = "INSERT INTO frame_identification (" \
                     "video_name, video_url, start_time, end_time, violence_type, violence_mode, image, address, " \
                     "longitude, latitude, experienced_years, approved_by_salon) " \
                     "values ('{}','{}','{}','{}','{}','{}')" \
            .format(video_name, video_url, start_time, end_time, violence_type, violence_mode)

        print(sql_insert)

        result = engine.execute(sql_insert)
        return {"status": True, "msg": "Insert Success"}
    except:
        return {"status": False, "msg": "Something Went Wrong"}
