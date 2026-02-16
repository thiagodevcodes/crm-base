package com.sos.base.shared.web.uploads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UploadDto {
   private String name;
   private String type;
   private String url;
}