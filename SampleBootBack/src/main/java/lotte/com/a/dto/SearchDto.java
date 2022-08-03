package lotte.com.a.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class SearchDto {
    private int start;
    private int end;
    private int page;
    private String search;
    private String choice;
}
