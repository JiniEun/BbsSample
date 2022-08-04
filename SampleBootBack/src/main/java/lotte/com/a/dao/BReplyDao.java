package lotte.com.a.dao;

import lotte.com.a.dto.BReplyDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface BReplyDao {

    List<BReplyDto> getBReplyList(int bbs_seq);
    int getBReplyCount(BReplyDto bReplyDto);

    int writeBReply(BReplyDto bReplyDto);
    int deleteBReply(BReplyDto bReplyDto);

}
