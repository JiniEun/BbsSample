package lotte.com.a.service;

import lotte.com.a.dao.MemberDao;
import lotte.com.a.dto.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {

    @Autowired
    MemberDao memberDao;

    public boolean idCheck(String id) {
        if (memberDao.idCheck(id) != null) {
            return false;
        }
        return true;
    }

    public boolean emailCheck(String email) {
        if (memberDao.emailCheck(email) != null) {
            return false;
        }
        return true;
    }

    public boolean addMember(MemberDto memberDto) {
        return memberDao.addMember(memberDto) > 0;
    }

    public boolean login(MemberDto memberDto) {
        return memberDao.login(memberDto) != null;
    }

    public MemberDto getMemberById(MemberDto memberDto) {
        return memberDao.getMemberById(memberDto);
    }
}
