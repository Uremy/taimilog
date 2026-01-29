'use client';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useDocsSearch } from 'fumadocs-core/search/client';
import { useState } from 'react';
// 👇 Importamos el Popover para hacer el menú desplegable
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { ChevronDown, Filter } from 'lucide-react'; // Agregué Filter para el icono
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn'; // Asegúrate que esta ruta a 'cn' sea correcta (a veces es lib/cn)

// 👇 1. Definimos tus etiquetas aquí
const filterItems = [
  {
    name: 'Todo',
    description: 'Buscar en todos los apuntes',
    value: undefined, // undefined = sin filtro
  },
  {
    name: 'Medicina',
    description: 'Apuntes de la carrera',
    value: 'Medicina',
  },
  {
    name: 'Biblioteca',
    description: 'Filosofía y pensamientos',
    value: 'Biblioteca',
  },
];

export default function CustomSearchDialog(props: SharedProps) {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState<string | undefined>();
  
  // 👇 2. Usamos tu configuración de búsqueda local (no orama-cloud)
  const { search, setSearch, query } = useDocsSearch({
    type: 'fetch',
    tag,
    // Si necesitas forzar idioma: locale: 'es'
  });

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput placeholder="Buscar..." />
          <SearchDialogClose />
        </SearchDialogHeader>
        
        <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
        
        {/* 👇 3. El Footer estilo Fumadocs Oficial */}
        <SearchDialogFooter className="flex flex-row items-center justify-between border-t p-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className={buttonVariants({
                size: 'sm',
                color: 'ghost',
                className: 'gap-2 px-2 text-fd-muted-foreground hover:text-fd-foreground',
              })}
            >
              <Filter className="size-3.5" />
              <span className="text-sm font-medium">
                {/* Muestra el nombre del filtro actual o "Filtrar" */}
                {filterItems.find((item) => item.value === tag)?.name || 'Filtrar'}
              </span>
              <ChevronDown className="size-3.5 opacity-50" />
            </PopoverTrigger>
            
            <PopoverContent className="flex flex-col p-1 w-[200px]" align="start" side="top">
              {filterItems.map((item, i) => {
                const isSelected = item.value === tag;

                return (
                  <button
                  type="button"
                    key={i}
                    onClick={() => {
                      setTag(item.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'flex flex-col items-start rounded-md px-2 py-1.5 text-sm transition-colors',
                      isSelected
                        ? 'bg-fd-accent text-fd-accent-foreground'
                        : 'hover:bg-fd-accent/50 hover:text-fd-accent-foreground'
                    )}
                  >
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.description && (
                        <span className="text-xs text-fd-muted-foreground line-clamp-1 text-left">
                            {item.description}
                        </span>
                    )}
                  </button>
                );
              })}
            </PopoverContent>
          </Popover>

          <div className="text-[12px] text-fd-muted-foreground px-2">
            ¿Qué deseas buscar?
          </div>
        </SearchDialogFooter>

      </SearchDialogContent>
    </SearchDialog>
  );
}