package kz.javaee.codenames.dto;

import kz.javaee.codenames.utils.Underneath;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CardDto implements Serializable {

    private int row;
    private int col;
    private String text;
    private boolean isOpened;
    private Underneath underneath;

}
