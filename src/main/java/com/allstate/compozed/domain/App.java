package com.allstate.compozed.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

/**
 * Created by localadmin on 3/14/17.
 */
@Entity
public class App {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int disk_allocationmb;

    private int  memory_allocationmb;

    private String name;

    @ManyToOne
    @JoinColumn(name = "spaces_id")
    @JsonIgnore
    private Spaces space = new Spaces();



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDisk_allocationmb() {
        return disk_allocationmb;
    }

    public void setDisk_allocationmb(int disk_allocationmb) {
        this.disk_allocationmb = disk_allocationmb;
    }

    public int getMemory_allocationmb() {
        return memory_allocationmb;
    }

    public void setMemory_allocationmb(int memory_allocationmb) {
        this.memory_allocationmb = memory_allocationmb;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Spaces getSpace() {
        return space;
    }

    public void setSpace(Spaces space) {
        this.space = space;
    }
}
