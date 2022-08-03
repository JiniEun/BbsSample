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
public class BbsDto {
    private int seq;    // sequence
    private String id;  // 작성자

    private int ref;    // 그룹번호
    private int step;   // 행번호
    private int depth;  // 깊이

    private String title;
    private String content;
    private String wdate;

    private int del;    // 글 삭제 여부
    private int readcount;

}