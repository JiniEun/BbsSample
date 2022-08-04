package lotte.com.a.service;

import lotte.com.a.dao.BReplyDao;
import lotte.com.a.dto.BReplyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BReplyService {

    @Autowired
    private BReplyDao bReplyDao;

    public List<BReplyDto> getBReplyList(int bbs_seq) {
        return bReplyDao.getBReplyList(bbs_seq);
    }

    public int getBReplyCount(BReplyDto bReplyDto) {
        return bReplyDao.getBReplyCount(bReplyDto);
    }

    public boolean writeBReply(BReplyDto bReplyDto) {
        return bReplyDao.writeBReply(bReplyDto) > 0;
    }

    public boolean deleteBReply(BReplyDto bReplyDto) {
        return bReplyDao.deleteBReply(bReplyDto) > 0;
    }
}
