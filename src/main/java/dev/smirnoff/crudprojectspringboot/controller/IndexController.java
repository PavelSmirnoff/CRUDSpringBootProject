package dev.smirnoff.crudprojectspringboot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class IndexController {

	@GetMapping(value = "/")
	public String indexPage(ModelMap model) {
		List<String> messages = new ArrayList<>();
		messages.add("Хай!");
		messages.add("Это Spring MVC приложение,");
		messages.add("рожденное в муках и непонимании происходящего.");
		model.addAttribute("messages", messages);
		return "index";
	}
}