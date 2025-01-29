<template>
    <GridLayout
        columns="*,*,*,*"
        class="w-full space-x-4 ml-6 mt-4"
        horizontalAlignment="center"
    >
        <NSLabel
            v-for="(dept, index) in props.departments"
            :key="dept.id"
            :col="index"
            class="bg-purple_box rounded-3xl mx-1 p-4"
            textWrap="true"
            verticalAlignment="center"
            textAlignment="center"
            @tap="onDepartmentTap(dept)"
        >
            <Span 
                :text="dept.icon + '\n'"
                fontSize="24"
                textAlignment="center"
                marginBottom="8"
            />
            <Span
                :text="dept.name"
                fontSize="14"
                color="#4B5563"
                textAlignment="center"
            />
        </NSLabel>
    </GridLayout>
</template>

<script setup lang="ts">
interface Department {
    id: number;
    name: string;
    icon: string;
}

const props = defineProps<{
    departments: Department[];
}>();

const emit = defineEmits<{
    (e: "departmentSelect", department: Department): void;
}>();

const onDepartmentTap = (department: Department) => {
    emit("departmentSelect", department);
};
</script>