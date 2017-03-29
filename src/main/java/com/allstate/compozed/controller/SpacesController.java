package com.allstate.compozed.controller;

import com.allstate.compozed.domain.App;
import com.allstate.compozed.domain.Spaces;
import com.allstate.compozed.repository.SpacesRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by localadmin on 3/14/17.
 */
@RestController
@RequestMapping("/spaces")
public class SpacesController {

    private final SpacesRepository repository;

    public SpacesController(SpacesRepository repository) {
        this.repository = repository;
    }

    @PostMapping("")
    public Spaces createSpace(@RequestBody Spaces spaces) {
        this.repository.save(spaces);
        return spaces;
    }

    @GetMapping("")
    public Iterable<Spaces> findAllSpaces ()
    {
        return this.repository.findAll();
    }

    @GetMapping("/{id}")
    public Spaces getSpaceById(@PathVariable long id) {
        return this.repository.findOne(id);
    }

    @PutMapping("/{id}")
    public Spaces updateSpace(@RequestBody Spaces spaces,@PathVariable long id) {

        Spaces oldSpace = this.repository.findOne(id);
        spaces.setId(oldSpace.getId());

        return this.repository.save(spaces );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteSpace(@PathVariable long id) {
        this.repository.delete(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.NO_CONTENT);
    }
}
