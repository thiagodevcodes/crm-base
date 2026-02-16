package com.sos.base.shared.web.uploads;

import java.time.Duration;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

@Service
@RequiredArgsConstructor
public class UploadService {

   @Autowired
   private S3Client s3Client;

   @Autowired
   private S3Presigner presigner;

   @Value("${cloudflare.r2.bucket}")
   private String bucketName;

   @Value("${cloudflare.r2.access-key}")
   private String accessKey;

   @Value("${cloudflare.r2.secret-key}")
   private String secretKey;

   @Value("${cloudflare.r2.endpoint}")
   private String endpoint;

   public UploadDto save(MultipartFile file) throws Exception {
      String fileName = "uploads/" + UUID.randomUUID() + "-" + file.getOriginalFilename();

      PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(fileName)
            .contentType(file.getContentType())
            .build();

      s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));

      // Gerar URL assinada
      GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
            .getObjectRequest(b -> b.bucket(bucketName).key(fileName))
            .signatureDuration(Duration.ofMinutes(15))
            .build();

      PresignedGetObjectRequest presignedRequest = presigner.presignGetObject(presignRequest);

      UploadDto uploadDto = new UploadDto();

      uploadDto.setName(file.getOriginalFilename());
      uploadDto.setType(file.getContentType());
      uploadDto.setUrl(presignedRequest.url().toString());

      return uploadDto;
   }
}
