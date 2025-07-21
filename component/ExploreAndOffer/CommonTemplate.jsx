import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../color/color';

export default function CommonTemplate({
  lineLength = 2,
  step = 1,
  title = "",
  skill = [],
  selectedSkill = [],
  setSelectedSkill = () => {},
  onSubmit,
  btn = "Submit"
}) {
  const handleSelect = (name) => {
    if (selectedSkill.includes(name)) {
      setSelectedSkill(selectedSkill.filter((item) => item !== name));
    } else {
      setSelectedSkill([...selectedSkill, name]);
    }
  };

  const progress = (step / lineLength) * 100;

  const navigate = useNavigation();

  return (
    <View style={styles.container}>
      {/* Step and Skip */}
      <View style={styles.topContainer}>
        <View style={styles.stepRow}>
          <Text style={styles.stepText}>Step {step}/{lineLength}</Text>
          <TouchableOpacity onPress={() => navigate.navigate("BottomTabs")} >
            <Text style={styles.skip}>Skip →</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>You can customize this at any time.</Text>
      </View>

      {/* Skill Buttons */}
      <View style={styles.skillContainer}>
        {skill.map((data, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.skillButton,
              selectedSkill.includes(data.name) && styles.selectedSkill
            ]}
            onPress={() => handleSelect(data.name)}
          >
            <Text
              style={[
                styles.skillText,
                selectedSkill.includes(data.name) && styles.selectedSkillText
              ]}
            >
              {data.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>{btn}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    marginTop:30
  },
  topContainer: {
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepText: {
    color: '#3A3A3A',
    fontWeight: '500',
  },
  skip: {
    color: Colors.primary,
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#E4E4E4',
    borderRadius: 10,
    marginTop: 8,
  },
  progressBarFill: {
    height: 4,
    backgroundColor:  Colors.primary,
    borderRadius: 10,
  },
  titleContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    color: '#777',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  skillButton: {
    borderWidth: 1,
    borderColor:  Colors.primary,
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 14,
    margin: 4,
  },
  skillText: {
    color:  Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedSkill: {
    backgroundColor:  Colors.primary,
  },
  selectedSkillText: {
    color: '#fff',
  },
  submitBtn: {
    backgroundColor:  Colors.primary,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 'auto',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
