package lotte.com.a.controller;

import lotte.com.a.dto.BReplyDto;
import lotte.com.a.service.BReplyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RequestMapping("/bReply")
@RestController
public class BReplyController {

    @Autowired
    private BReplyService bReplyService;

    private Logger log = LoggerFactory.getLogger(BReplyController.class);

    @GetMapping("/getBReplyList/{seq}")
    public List<BReplyDto> getBReplyList(@PathVariable int seq) {
        log.info("getBReplyList " + new Date());

        List<BReplyDto> bReplyList = bReplyService.getBReplyList(seq);

        for(BReplyDto dto : bReplyList){
            log.info(dto.toString());
        }

        return bReplyList;
    }

    @PostMapping("/writeBReply")
    public String writeBReply(@RequestBody BReplyDto bReplyDto) {
        log.info("writeBReply() " + new Date());

        boolean check = bReplyService.writeBReply(bReplyDto);
        if (!check) {
            return "NO";
        }
        return "YES";
    }

    @PostMapping("/deleteBReply")
    public String deleteBReply(@RequestBody BReplyDto bReplyDto) {
        log.info("deleteBReply() " + new Date());

        boolean check = bReplyService.deleteBReply(bReplyDto);
        if (!check) {
            return "NO";
        }
        return "YES";
    }

    @GetMapping(value = "/getBReplyCount")
    public int getBReplyCount(@RequestBody BReplyDto bReplyDto) {
        log.info("getBReplyCount() " + new Date());

        return bReplyService.getBReplyCount(bReplyDto);
    }
}
