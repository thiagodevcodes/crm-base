package com.sos.base.core.images;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<ImageEntity, UUID> {
}