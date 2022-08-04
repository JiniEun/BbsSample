package lotte.com.a.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// Bulletin Board System
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class BbsHistoryDto {
    private int seq;    // sequence
    private int bbsseq;
    private String reader;  // 작성자

}