package com.sos.base.core.uploads;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sos.base.core.uploads.dtos.UploadDto;

@RestController
@RequestMapping("/uploader")
public class UploaderController {
    @Autowired
    private UploaderService uploadService;

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createFile(
            @RequestParam("files") List<MultipartFile> files) throws Exception {

        List<UploadDto> uploads = uploadService.saveMulti(files);

        return ResponseEntity.ok(uploads);
    }
}
