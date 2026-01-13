package com.sos.base.security;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

@Component("rsaKeyInitializer")
public class RsaKeyInitializer {

   @Value("${jwt.private.key}")
   private Resource privateKey;

   @Value("${jwt.public.key}")
   private Resource publicKey;

   @PostConstruct
   public void init() throws Exception {
      System.out.println("🚀 RsaKeyInitializer STARTED");
      System.out.println("📂 user.dir = " + System.getProperty("user.dir"));
      System.out.println("📂 private key resolved to = " + privateKey.getFile());

      Path privatePath = privateKey.getFile().toPath();
      Path publicPath = publicKey.getFile().toPath();

      if (Files.exists(privatePath) && Files.exists(publicPath)) {
         System.out.println("⚠️ Keys already exist, skipping generation");
         return;
      }

      Files.createDirectories(privatePath.getParent());

      KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
      generator.initialize(4096);
      KeyPair keyPair = generator.generateKeyPair();

      writePem(
            privatePath,
            "PRIVATE KEY",
            keyPair.getPrivate().getEncoded());

      writePem(
            publicPath,
            "PUBLIC KEY",
            keyPair.getPublic().getEncoded());

      System.out.println("🔐 RSA keys generated (PEM)");
   }

   private void writePem(Path path, String type, byte[] encoded) throws Exception {
      String pem = "-----BEGIN " + type + "-----\n"
            + Base64.getMimeEncoder(64, "\n".getBytes())
                  .encodeToString(encoded)
            + "\n-----END " + type + "-----\n";

      Files.writeString(path, pem);
   }
}