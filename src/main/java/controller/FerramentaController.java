package com.example.gerencferramentas.controller;

import com.example.gerencferramentas.model.Ferramenta;
import com.example.gerencferramentas.service.FerramentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ferramentas")
public class FerramentaController {

    @Autowired
    private FerramentaService ferramentaService;

    @GetMapping
    public List<Ferramenta> listar() {
        return ferramentaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Ferramenta buscarPorId(@PathVariable Long id) {
        return ferramentaService.buscarPorId(id);
    }

    @PostMapping
    public Ferramenta criar(@RequestBody Ferramenta ferramenta) {
        return ferramentaService.salvar(ferramenta);
    }

    @PutMapping("/{id}")
    public Ferramenta atualizar(@PathVariable Long id, @RequestBody Ferramenta ferramenta) {
        ferramenta.setId(id);
        return ferramentaService.salvar(ferramenta);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        ferramentaService.excluir(id);
    }

    @GetMapping("/search")
    public List<Ferramenta> buscar(@RequestParam String nome) {
        return ferramentaService.buscarPorNome(nome);
    }
}
