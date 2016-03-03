/**********************************************************************************************************************
 * Copyright (c) 2016. Lorem ipsum dolor sit amet, consectetur adipiscing elit.                                       *
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.                        *
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.                                                   *
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.                     *
 * Vestibulum commodo. Ut rhoncus gravida arcu.                                                                       *
 **********************************************************************************************************************/

package zzwu.std.authority.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**************************************************************************
 * <pre>
 *     FileName: zzwu.std.authority.web.controller.DemoController
 *         Desc:
 *       author: Z_Z.W - myhongkongzhen@gmail.com
 *      version: 2016-3-3 11:44
 *   LastChange: 2016-3-3 11:44
 *      History:
 * </pre>
 **************************************************************************/
@Controller
//@RequestMapping( value = "/sms" )
public class DemoController
{
    private static final Logger logger = LoggerFactory.getLogger( DemoController.class );


    /**
     * http://localhost:8888/order/send?msg=XXX
     *
     * @param msg
     *
     * @return
     */
    @RequestMapping( value = "/{msg}", produces = "text/plain;charset=UTF-8" )
    @ResponseBody
    public String batch( String msg )
    {
        logger.info( "==={}===", msg );
        return "SUCCESS";
    }
}
