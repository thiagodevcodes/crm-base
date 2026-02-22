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
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

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
      String key = UUID.randomUUID() + "-" + file.getOriginalFilename();

      PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .contentType(file.getContentType())
            .build();

      s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));

      UploadDto uploadDto = new UploadDto();

      uploadDto.setName(file.getOriginalFilename());
      uploadDto.setType(file.getContentType());
      uploadDto.setKey(key);
      uploadDto.setSize(file.getSize());

      return uploadDto;
   }

   public String generateSignedUrl(String key) {
      GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
            .getObjectRequest(b -> b.bucket(bucketName).key(key))
            .signatureDuration(Duration.ofMinutes(15))
            .build();

      return presigner.presignGetObject(presignRequest)
            .url()
            .toString();
   }

   public String generatePublicUrl(String key) {
      return endpoint + "/" + key;
   }

   public void delete(String key) {
      DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build();

      s3Client.deleteObject(deleteRequest);
   }
}
