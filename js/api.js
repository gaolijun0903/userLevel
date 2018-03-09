url : /h5/userinfo
请求方式：get
请求参数：access_token

响应参数：

{
    "ret_code":200,
    "ret_msg":"",
    "result":{
		"user_id":26049179,
        "level_id":1,
        "level_name":"银卡",
        "level_en_name":"SILVER CARD",
        "month_order_count":2,   //本月订单数
        "month_mileage":0,   //本月公里数
        "next_month_mileage":50,      //下一级别需要的里程数
        "next_month_order_count":3,   //下一级别需要的订单数
        "remainder_mileage":50,    //剩余里程数
        "remainder_order_count":1,     //剩余订单数
        "is_preserve_level":0,      //是否保级，1：是  ，0：否
        "preserve_level_month":0,     //是否保级的最后一个月
        "month_complete":66    //当月完成百分比 66%（里程百分比and订单百分比 取最大值）
    }
}