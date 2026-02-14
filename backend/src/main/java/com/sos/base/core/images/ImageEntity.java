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
   private UUID id;

   private String nome;

   private String type;

   @Lob
   private byte[] data;

   // getters e setters
}