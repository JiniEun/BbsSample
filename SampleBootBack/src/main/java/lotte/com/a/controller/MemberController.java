package lotte.com.a.controller;

import lotte.com.a.dto.MemberDto;
import lotte.com.a.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/member")
@RestController
public class MemberController {
    private Logger log = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    MemberService memberService;

    @PostMapping("/idCheck")
    public String idCheck(String id) {
        log.info("idCheck() " + new Date());
        String msg = "NO";
        if (memberService.idCheck(id)) {
            msg = "YES";
            return msg;
        }
        return msg;
    }

    @PostMapping("/emailCheck")
    public String emailCheck(String email) {
        log.info("emailCheck() " + new Date());
        String msg = "NO";
        if (memberService.emailCheck(email)) {
            msg = "YES";
            return msg;
        }
        return msg;
    }

    @PostMapping("/regi")
    public String addMember(MemberDto memberDto) {
        memberDto.setAuth(3);
        log.info("addMember()" + new Date());
        String msg = "NO";
        if (memberService.addMember(memberDto)) {
            msg = "YES";
            log.info(memberDto.toString());
            return msg;
        }
        return msg;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody MemberDto memberDto) {

        log.info("login() " + new Date());

        Map<String, Object> map = new HashMap<>();
        String msg = "NO";
        if (memberService.login(memberDto)) {
            msg = "YES";
            log.info(memberDto.toString());
            map.put("memberDto", memberService.getMemberById(memberDto));
        }

        map.put("msg", msg);

        return map;
    }
}
