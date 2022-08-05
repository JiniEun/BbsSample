package lotte.com.a.service;

import lotte.com.a.dao.BbsDao;
import lotte.com.a.dto.BbsDto;
import lotte.com.a.dto.BbsHistoryDto;
import lotte.com.a.dto.SearchDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BbsService {

    @Autowired
    BbsDao bbsDao;

    public List<BbsDto> getBbsPagingSearchList(SearchDto searchDto) {
        return bbsDao.getBbsPagingSearchList(searchDto);
    }

    public List<BbsDto> getBbsList() {
        return bbsDao.getBbsList();
    }

    public int getBbsCount(SearchDto searchDto) {
        return bbsDao.getBbsCount(searchDto);
    }


    public BbsDto getBbsById(int seq) {
        return bbsDao.getBbsById(seq);
    }

    public boolean writeBbs(BbsDto bbsDto) {
        return bbsDao.writeBbs(bbsDto) > 0;
    }

    public boolean updateBbs(BbsDto bbsDto) {
        return bbsDao.updateBbs(bbsDto) > 0;
    }

    public boolean deleteBbs(BbsDto bbsDto) {
        BbsDto findDto = bbsDao.getBbsById(bbsDto.getSeq());
        bbsDto.setRef(findDto.getRef());
        bbsDto.setDepth(findDto.getDepth());
        int cnt = 0;
        if (bbsDto.getDepth() == 0) {
            List<Integer> list = bbsDao.getSeqByRef(bbsDto.getRef());
            for (Integer i : list) {
                bbsDao.deleteAnswerBySeq(i);
            }
        }
        cnt += bbsDao.deleteBbs(bbsDto);
        return cnt > 0;
    }

    public boolean answer(int seq, BbsDto bbsDto) {
        int cnt = 0;
        cnt = bbsDao.updateStep(seq);
        Map<String, Object> map = new HashMap<>();
        map.put("seq", seq);
        map.put("id", bbsDto.getId());
        map.put("title", bbsDto.getTitle());
        map.put("content", bbsDto.getContent());
        cnt += bbsDao.insertAnswer(map);
        return cnt > 0;
    }

    private boolean updateReadCount(int seq) {
        return bbsDao.updateReadCount(seq) > 0;
    }

    private boolean insertToHistory(BbsHistoryDto bbsHistoryDto) {
        return bbsDao.insertToHistory(bbsHistoryDto) > 0;
    }

    private BbsHistoryDto findHistory(BbsHistoryDto bbsHistoryDto) {
        return bbsDao.findHistory(bbsHistoryDto);
    }

    public boolean updateRead(BbsHistoryDto bbsHistoryDto) {
        if (findHistory(bbsHistoryDto) != null) {
            return false;
        }

        insertToHistory(bbsHistoryDto);
        updateReadCount(bbsHistoryDto.getBbsseq());
        return true;
    }
}
