package lotte.com.a.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Service;

// Bulletin Board System
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class BReplyDto {
    private int seq;    // sequence
    private String id;  // 작성자

    private String content;
    private String wdate;
    private int bbsseq;

}