package com.allstate.compozed.domain;

import com.allstate.compozed.exception.AppQuotaException;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by localadmin on 3/14/17.
 */
@Entity
public class Spaces {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int disk_quotamb;

    private int memory_quotamb;

    private String name;

    @OneToMany(mappedBy = "space", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<App> appList = new ArrayList<>();

    public Spaces() {

    }

    public Spaces(String name, List<App> apps){
        this.name = name;
        this.appList = apps;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getDisk_quotamb() {
        return disk_quotamb;
    }

    public void setDisk_quotamb(int disk_quotamb) {
        this.disk_quotamb = disk_quotamb;
    }

    public int getMemory_quotamb() {
        return memory_quotamb;
    }

    public void setMemory_quotamb(int memory_quotamb) {
        this.memory_quotamb = memory_quotamb;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<App> getAppList() {
        return appList;
    }

    public void setAppList(List<App> appList) {
        this.appList = appList;
    }

    public List<AppQuotaException> validateApps (Spaces space)
    {
        List <AppQuotaException> appQuotaList = new ArrayList<>();

        long totalDiskQuota = 0;
        long totalMemoryQuota = 0;

        for(App app : space.getAppList())
        {
            totalDiskQuota += app.getDisk_allocationmb();
            totalMemoryQuota += app.getMemory_allocationmb();

            if (app.getDisk_allocationmb() > space.getDisk_quotamb()) {
                appQuotaList.add(new AppQuotaException("You have exceeded your disk quota for app " + app.getName()));
            }

            if (app.getMemory_allocationmb() >space.getMemory_quotamb()) {
                appQuotaList.add(new AppQuotaException("You have exceeded your memory quota for app " + app.getName()));
            }
        }

        if (totalDiskQuota > space.getDisk_quotamb()) {
            appQuotaList.add(new AppQuotaException("You have exceeded your total disk quota.  Please purchase more space"));
        }

        if (totalMemoryQuota > space.getMemory_quotamb()) {
            appQuotaList.add(new AppQuotaException("You have exceeded your total memory quota.  Please purchase more space"));
        }
        return appQuotaList;
    }
}
