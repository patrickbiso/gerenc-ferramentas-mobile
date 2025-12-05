package com.example.gerencferramentasmobile.controller;

import com.example.gerencferramentasmobile.model.Ferramenta;
import com.example.gerencferramentasmobile.service.FerramentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        Ferramenta f = ferramentaService.buscarPorId(id);
        if (f == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(f);
    }

    @PostMapping
    public ResponseEntity<Ferramenta> criar(@RequestBody Ferramenta ferramenta) {
        Ferramenta criada = ferramentaService.salvar(ferramenta);
        return ResponseEntity.ok(criada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ferramenta> atualizar(@PathVariable Long id, @RequestBody Ferramenta ferramenta) {
        Ferramenta existente = ferramentaService.buscarPorId(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }
        ferramenta.setId(id);
        Ferramenta atualizada = ferramentaService.salvar(ferramenta);
        return ResponseEntity.ok(atualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Ferramenta existente = ferramentaService.buscarPorId(id);
        if (existente == null) {
            return ResponseEntity.notFound().build();
        }
        ferramentaService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Ferramenta>> buscar(@RequestParam String nome) {
        return ResponseEntity.ok(ferramentaService.buscarPorNome(nome));
    }
}
