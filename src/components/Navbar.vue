
<template>
    <header>
        <div class="logo-nav">
            <img src="@/assets/zoef_logo.svg">
        </div>
        <nav class="my-2">
            <b-nav tabs>
                <b-nav-item :to="'/'" active-class="active" exact>Beginner</b-nav-item>
                <b-nav-item :to="'Advanced'" active-class="active">Advanced</b-nav-item>
                <b-nav-item :to="'Sensors'" active-class="active">Sensors</b-nav-item>
                <b-nav-item :to="'Settings'" active-class="active">Settings</b-nav-item>
                <b-nav-item :to="'Network'" active-class="active">Network</b-nav-item>
            </b-nav>
        </nav>
    </header>
</template>