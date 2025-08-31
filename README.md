# Performance Profiling

## Optimization Summary

1. **Country Search**: 100.7ms → 40.6ms - **60% improvement**
2. **Region Filter**: 91.9ms → 37.3ms - **59% improvement**
3. **Year Filter**: 135.2ms → 77ms - **43% improvement**
4. **Sorting (Population)**: 115ms → 82.5ms - **28% improvement**
5. **Coal CO2 Column**: 197ms → 147.3ms - **25% improvement**
6. **Country Details**: 150ms → 123.5ms - **18% improvement**
7. **Initial Render**: 68.1ms → 84.4ms - **24% slower**

---

## Before Optimization

### Initial Render Performance

- **Commit time**: 1.2s
- **Render time**: 68.1ms
![img.png](readme_img/img.png)

### Country Details Performance

- **Commit time**: 0.9s
- **Render duration**: 150ms
- **Trigger**: User clicking row
![img_4.png](readme_img/img_4.png)
![img_3.png](readme_img/img_3.png)

## All further tests were performed with details panel open

### Sorting Performance (Population Column)

- **Commit time**: 1.1s
- **Render duration**: 115ms
- **Trigger**: User clicking column header
![img_5.png](readme_img/img_5.png)
![img_6.png](readme_img/img_6.png)


### Filtering Performance (Region Filter)

- **Commit time**: 1.2s
- **Render duration**: 91.9ms
- **Trigger**: Changing region filter
![img_1.png](readme_img/img_1.png)
![img_7.png](readme_img/img_7.png)

### Year Filter Performance

- **Commit time**: 1.1s
- **Render duration**: 135.2ms
- **Trigger**: Changing year filter
![img_8.png](readme_img/img_8.png)
![img_9.png](readme_img/img_9.png)

### Country Search Performance

- **Commit time**: 2.6s
- **Render duration**: 100.7ms
- **Trigger**: New input in search field
![img_10.png](readme_img/img_10.png)
![img_11.png](readme_img/img_11.png)

### Coal CO2 Column Performance
- **Commit time**: 1.5s
- **Render duration**: 197ms
- **Trigger**: Enabling coal_co2 column in details

---

## After Optimization

### Initial Render Performance

- **Commit time**: 1.3s
- **Render time**: 84.4ms
![img_14.png](readme_img/img_14.png)
![img_15.png](readme_img/img_15.png)

### Country Details Performance

- **Commit time**: 0.6s
- **Render duration**: 123.5ms
- **Trigger**: User clicking row
![img_16.png](readme_img/img_16.png)
![img_17.png](readme_img/img_17.png)

## All further tests were performed with details panel open

### Sorting Performance (Population Column)

- **Commit time**: 0.6s
- **Render duration**: 82.5ms
- **Trigger**: User clicking column header
![img_18.png](readme_img/img_18.png)
![img_19.png](readme_img/img_19.png)

### Filtering Performance (Region Filter)

- **Commit time**: 1.2s
- **Render duration**: 37.3ms
- **Trigger**: Changing region filter
![img_20.png](readme_img/img_20.png)
![img_21.png](readme_img/img_21.png)

### Year Filter Performance

- **Commit time**: 1.0s
- **Render duration**: 77ms
- **Trigger**: Changing year filter
![img_22.png](readme_img/img_22.png)
![img_23.png](readme_img/img_23.png)

### Country Search Performance

- **Commit time**: 1.0s
- **Render duration**: 40.6ms
- **Trigger**: New input in search field
![img_24.png](readme_img/img_24.png)
![img_25.png](readme_img/img_25.png)

### Coal CO2 Column Performance
- **Commit time**: 1.5s
- **Render duration**: 147.3ms
- **Trigger**: Enabling coal_co2 column in details
![img_26.png](readme_img/img_26.png)
![img_27.png](readme_img/img_27.png)