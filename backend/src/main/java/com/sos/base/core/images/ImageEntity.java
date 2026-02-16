package com.sos.base.core.images;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_images")
public class ImageEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private UUID uploadId;

   private String name;

   private String type;

   @Column(length = 2000)
   private String url;

   // getters e setters
}
