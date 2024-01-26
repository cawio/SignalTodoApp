import { computed, inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withComputed,
    withHooks,
    withMethods,
    withState
} from "@ngrx/signals";
import {
    addEntities,
    addEntity,
    removeEntity,
    updateEntity,
    withEntities
} from "@ngrx/signals/entities";
import { firstValueFrom } from "rxjs";
import { TodoDTO } from "../../dtos/TodoDTO";
import { TodoService } from "../../services/todo.service";
import { LoadingService } from "../loading-spinner/services/loading.service";

type TodosState = {
    filter: string;
};

const initialState: TodosState = {
    filter: "",
};

export const TodosStore = signalStore(
    { providedIn: "root" },
    withState(initialState),
    withEntities<TodoDTO>(),
    withComputed(({ entities, filter }) => ({
        filteredTodos: computed(() => {
            return entities().filter(todo => todo.title.toLowerCase().includes(filter().toLowerCase()))
        }),
    })),
    withMethods((
        state,
        todoService = inject(TodoService),
        loadingService = inject(LoadingService)
    ) => ({
        setFilter: (filter: string) => patchState(state, { filter }),

        addTodo: (todo: TodoDTO) => {
            const id = state.entities().length + 1;
            patchState(state, addEntity({ ...todo, id }));
        },

        deleteTodo: (id: number) => {
            patchState(state, removeEntity(id));
        },

        completeTodo: (id: number) => {
            patchState(state, updateEntity({ id: id, changes: { isCompleted: true } }));
        },

        uncompleteTodo: (id: number) => {
            patchState(state, updateEntity({ id: id, changes: { isCompleted: false } }));
        },

        load: async () => {
            loadingService.startLoading();
            const todos = await firstValueFrom(todoService.fetchTodos());
            patchState(state, addEntities(todos));
            loadingService.stopLoading();
        },
    })),
    withHooks({
        async onInit(store) {
            await store.load();
        },

        onDestroy(store) {
            store.setFilter("");
        },
    }),
);
