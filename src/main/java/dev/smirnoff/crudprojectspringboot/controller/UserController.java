package dev.smirnoff.crudprojectspringboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {

	@GetMapping(value = "/user")
	public String indexPage(ModelMap model) {
		List<String> messages = new ArrayList<>();
		messages.add("Это Spring MVC приложение,");
		messages.add("Ты на своей персональной странице.");
		model.addAttribute("messages", messages);
		return "user";
	}
	
}