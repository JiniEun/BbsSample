package lotte.com.a.dao;

import lotte.com.a.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface MemberDao {
    MemberDto idCheck(String id);
    MemberDto emailCheck(String email);

    int addMember(MemberDto memberDto);

    MemberDto login(MemberDto memberDto);
    MemberDto getMemberById(MemberDto memberDto);
}
