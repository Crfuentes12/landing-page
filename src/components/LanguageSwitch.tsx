// src/components/LanguageSwitch.tsx
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { Globe } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
  
  export function LanguageSwitch() {
    const { language, setLanguage } = useLanguage();
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Globe className="h-4 w-4 mr-2" />
            {language.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setLanguage('en')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('es')}>
            Español
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setLanguage('fr')}>
            Français
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }