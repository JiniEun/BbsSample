package lotte.com.a.controller;

import lotte.com.a.dto.BbsDto;
import lotte.com.a.dto.BbsHistoryDto;
import lotte.com.a.dto.SearchDto;
import lotte.com.a.service.BbsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RequestMapping("/bbs")
@RestController
public class BbsController {

    private Logger log = LoggerFactory.getLogger(BbsController.class);

    @Autowired
    BbsService bbsService;

    @PostMapping("/getBbsList")
    public List<BbsDto> getBbsList() {
        log.info("getBbsList " + new Date());

        List<BbsDto> bbsList = bbsService.getBbsList();

        return bbsList;
    }

    @PostMapping("/list")
    public Map<String, Object> getBbsPagingSearchList(@RequestBody SearchDto searchDto) {
        log.info("getBbsPagingSearchList " + new Date());
        Map<String, Object> map = new HashMap<>();

        int nowPage = searchDto.getPage();// 현재 보고있는 페이지
//        log.info("searchDto: "+searchDto.toString());
        int recordPerPage = 10; // 한페이지당 보여줄 레코드갯수
        int listLen = bbsService.getBbsCount(searchDto);
        // 총 페이지수
        int maxPage = (listLen + recordPerPage - 1) / recordPerPage; // (13 + 9) / 10

        // 시작 페이지수
        int startPage = ((nowPage - 1) / recordPerPage) * recordPerPage + 1;
        // 마지막 페이지수
        int endPage = startPage + recordPerPage;

        if (endPage > maxPage)
            endPage = maxPage;

        // DB에서 가져올 순번-----------------
        int startNum = ((nowPage - 1) * recordPerPage) + 1;

        searchDto.setStart(startNum);
        searchDto.setEnd((nowPage) * recordPerPage);

        List<BbsDto> bbsList = bbsService.getBbsPagingSearchList(searchDto);

        map.put("list", bbsList);
        map.put("bbsLen", listLen);
        map.put("startPage", startPage);
        map.put("endPage", endPage);
        map.put("page", nowPage);
        map.put("maxPage", maxPage);

        return map;
    }

    @PostMapping("/writeBbs")
    public String writeBbs(@RequestBody BbsDto bbsDto) {
        log.info("writeBbs() " + new Date());

        boolean check = bbsService.writeBbs(bbsDto);
        if (!check) {
            return "NO";
        }
        return "YES";
    }

    @PostMapping("/updateBbs")
    public String updateBbs(@RequestBody BbsDto bbsDto) {
        log.info("updateBbs() " + new Date());
        log.info(bbsDto.toString());

        boolean check = bbsService.updateBbs(bbsDto);
        if (!check) {
            return "NO";
        }
        return "YES";
    }

    @PostMapping("/deleteBbs")
    public String deleteBbs(@RequestBody BbsDto bbsDto) {
        log.info("deleteBbs() " + new Date());

        boolean check = bbsService.deleteBbs(bbsDto);
        if (!check) {
            return "NO";
        }
        return "YES";
    }

    @GetMapping("/detail/{seq}")
    public BbsDto detail(@PathVariable int seq) {
        log.info("detail() " + new Date());

        BbsDto bbsDto = bbsService.getBbsById(seq);

        return bbsDto;
    }

    @RequestMapping(value = "/getBbsSearchPageList", method = RequestMethod.GET)
    public List<BbsDto> getBbsSearchPageList(SearchDto searchDto) {
        log.info("getBbsSearchPageList() " + new Date());

        // 페이지 설정
        int sn = searchDto.getPage();
        int start = sn * 10 + 1;
        int end = (sn + 1) * 10;

        searchDto.setStart(start);
        searchDto.setEnd(end);

        return getBbsSearchPageList(searchDto);
    }

    @RequestMapping(value = "/getBbsCount", method = RequestMethod.GET)
    public int getBbsCount(SearchDto searchDto) {
        log.info("getBbsCount() " + new Date());

        return bbsService.getBbsCount(searchDto);
    }


    @PostMapping("/answerBbs")
    public String answerBbs(@RequestBody Map<String,Object> map) {
        log.info("answerBbs() " + new Date());
        int seq = Integer.parseInt((String) map.get("seq"));
        BbsDto bbsDto = new BbsDto();
        bbsDto.setId((String)((Map)map.get("bbsDto")).get("id"));
        bbsDto.setTitle((String)((Map)map.get("bbsDto")).get("title"));
        bbsDto.setContent((String)((Map)map.get("bbsDto")).get("content"));

        boolean check = bbsService.answer(seq, bbsDto);
        if (!check) {
            return "NO";
        }
        return "YES";
    }

    @PostMapping("/updateRead")
    public String updateRead(@RequestBody BbsHistoryDto bbsHistoryDto){
        log.info("updateRead() " + new Date());

        boolean check = bbsService.updateRead(bbsHistoryDto);
        if (!check) {
            return "NO";
        }
        return "YES";

    }

}
