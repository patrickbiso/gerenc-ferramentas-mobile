package com.example.gerencferramentas.controller;

import com.example.gerencferramentas.model.Ferramenta;
import com.example.gerencferramentas.service.FerramentaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;

import java.util.List;

@RestController
@RequestMapping("/api/ferramentas")
public class FerramentaController {

    @Autowired
    private FerramentaService ferramentaService;

    @GetMapping
    public String listar() {
        return "Ajuste futuro — método ainda será convertido para JSON";
    }

    @GetMapping("/nova")
    public String nova() {
        return "Ajuste futuro — método será removido (não existe em REST)";
    }

    @PostMapping("/salvar")
    public String salvar() {
        return "Ajuste futuro — será convertido para POST REST";
    }

    @GetMapping("/editar/{id}")
    public String editar(@PathVariable Long id) {
        return "Ajuste futuro — será removido no padrão REST";
    }

    @PostMapping("/excluir/{id}")
    public String excluirPost(@PathVariable Long id) {
        return "Ajuste futuro — será convertida para DELETE REST";
    }

    @GetMapping("/excluir/{id}")
    public String excluirGet(@PathVariable Long id) {
        return "Ajuste futuro — será removido no padrão REST";
    }

    @GetMapping("/buscar")
    public String buscar(@RequestParam String nome) {
        return "Ajuste futuro — será convertido para JSON (GET /search)";
    }

    @GetMapping("/{id}")
    public String detalhes(@PathVariable Long id) {
        return "Ajuste futuro — retornará JSON";
    }
}
