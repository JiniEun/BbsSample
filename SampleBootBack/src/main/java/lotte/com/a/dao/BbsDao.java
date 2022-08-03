package lotte.com.a.dao;

import lotte.com.a.dto.BbsDto;
import lotte.com.a.dto.SearchDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface BbsDao {
    List<BbsDto> getBbsPagingSearchList(SearchDto searchDto);
    List<BbsDto> getBbsList();
    int getBbsCount(SearchDto searchDto);

    int writeBbs(BbsDto bbsDto);
    int updateBbs(BbsDto bbsDto);
    int deleteBbs(BbsDto bbsDto);

    List<Integer> getSeqByRef(int ref);
    int deleteAnswerBySeq(int ref);

    BbsDto getBbsById(int seq);

    int updateStep(int seq);
    int insertAnswer(Map map);
}
