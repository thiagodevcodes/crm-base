package com.sos.base.core.experiencies;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "tb_experiences")
public class ExperienceEntity {
   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private UUID experienceId;

   private String title;

   private String period;

   private String description;

   private String technologies;
}
