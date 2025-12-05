package com.example.gerencferramentas.controller;

import com.example.gerencferramentas.model.Ferramenta;
import com.example.gerencferramentas.service.FerramentaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/ferramentas")
public class FerramentaController {

    @Autowired
    private FerramentaService ferramentaService;

    @GetMapping
    public ResponseEntity<List<Ferramenta>> listar() {
        return ResponseEntity.ok(ferramentaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ferramenta> buscarPorId(@PathVariable Long id) {
        Ferramenta ferramenta = ferramentaService.buscarPorId(id);
        return ResponseEntity.ok(ferramenta);
    }

    @PostMapping
    public ResponseEntity<Ferramenta> criar(@Valid @RequestBody Ferramenta ferramenta) {
        Ferramenta criada = ferramentaService.salvar(ferramenta);
        return ResponseEntity.created(URI.create("/api/ferramentas/" + criada.getId())).body(criada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ferramenta> atualizar(@PathVariable Long id, @Valid @RequestBody Ferramenta ferramenta) {
        ferramenta.setId(id);
        Ferramenta atualizada = ferramentaService.salvar(ferramenta);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        ferramentaService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Ferramenta>> buscar(@RequestParam String nome) {
        return ResponseEntity.ok(ferramentaService.buscarPorNome(nome));
    }
}
