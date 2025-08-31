package com.rally.up.go.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QrCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String uuid;
    private Instant dateUsed;

    @OneToOne(mappedBy = "qrCode")
    private ClientUser clientUser;

    @PrePersist
    public void setNewUUID() {
        this.uuid = java.util.UUID.randomUUID().toString();
    }

    public boolean useQrCode() {
        // if the qr code has been used more than 8 hours ago, set new date and uuid but return true, otherwise return false

        if (this.dateUsed.isAfter(Instant.now().minusSeconds(3600 * 8))) {
            this.dateUsed = Instant.now();
            setNewUUID();
            return true;
        }
        return false;
    }
}
