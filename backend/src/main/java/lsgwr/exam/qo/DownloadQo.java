package lsgwr.exam.qo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/***********************************************************
 * @note      : 要下载的文件的路径
 ***********************************************************/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DownloadQo {
    String path;
}
