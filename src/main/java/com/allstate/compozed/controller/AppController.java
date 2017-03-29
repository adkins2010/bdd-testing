package com.allstate.compozed.controller;

import com.allstate.compozed.domain.App;
import com.allstate.compozed.domain.Spaces;
import com.allstate.compozed.exception.AppQuotaException;
import com.allstate.compozed.domain.ErrorResponse;
import com.allstate.compozed.repository.AppRepository;
import com.allstate.compozed.repository.SpacesRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by localadmin on 3/15/17.
 */
@RestController
@RequestMapping(value="spaces/{id}/apps")
public class AppController {


    private final AppRepository appRepo;
    private final SpacesRepository spaceRepo;


    private List<AppQuotaException> appQuotaList = new ArrayList<>();

    public AppController(AppRepository repo, SpacesRepository spaceRepo) {
        this.appRepo = repo;
        this.spaceRepo = spaceRepo;
    }

    @PostMapping("")
    public App createApp(@RequestBody App app, @PathVariable long id) throws AppQuotaException {
        Spaces space = spaceRepo.findOne(id);

        app.setSpace(space);
        space.getAppList().add(app);

        appQuotaList = space.validateApps(space);

        if (appQuotaList.size() >0)
            throw new AppQuotaException();


        return appRepo.save(app);
    }

    @GetMapping("")
    public Iterable<App> findAllApps() {
        return this.appRepo.findAll();
    }

    @GetMapping("/{appId}")
    public App getDetails(@PathVariable long appId) {
        return appRepo.findOne(appId);
    }

    @PutMapping("/{appId}")
    public App updateDetails(@RequestBody App app, @PathVariable long appId) {
        app = this.appRepo.save(this.appRepo.findOne(appId));
        return app;
    }

    @DeleteMapping("/{appId}")
    public void deleteAppById(@PathVariable long appId) {
        this.appRepo.delete(appId);
    }


    @ExceptionHandler(AppQuotaException.class)
    public ResponseEntity<List<ErrorResponse>> exceptionHandler(Exception ex) {
        List<ErrorResponse> errorList = new ArrayList<>();

        for (AppQuotaException appExcept : appQuotaList) {
            ErrorResponse error = new ErrorResponse();
            error.setErrorCode(HttpStatus.FORBIDDEN.value());
            error.setMessage(appExcept.getMessage());
            errorList.add(error);
        }

        return new ResponseEntity<>(errorList, HttpStatus.FORBIDDEN);
    }
}